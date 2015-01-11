class SessionsController < ApplicationController
  
  def location_data
    if user_signed_in?  
      @current_user =  User.find(session[:user_id])
      params.delete :controller
      params.delete :action
      @current_user.update_attribute(:serialized_location, params.to_json)
      render json: {
        status: 200,
         message: "Everything went swell."
      }
    else 
      render json: {
        status: 420,
        message: "Unathorized"
      }
    end
  end

  def new
    redirect_to '/auth/facebook'
  end

  def create
    auth = request.env["omniauth.auth"]
    user = User.where(:provider => auth['provider'],
                      :uid => auth['uid'].to_s).first || User.create_with_omniauth(auth)
    reset_session
    session[:user_id] = user.id
    redirect_to root_url, :notice => 'Signed in!'
  end

  def destroy
    reset_session
    redirect_to root_url, :notice => 'Signed out!'
  end

  def failure
    redirect_to root_url, :alert => "Authentication error: #{params[:message].humanize}"
  end

end
