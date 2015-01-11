Rails.application.routes.draw do
  get '/auth/:provider/callback' => 'sessions#create'
  get '/signin' => 'sessions#new', :as => :signin
  get '/signout' => 'sessions#destroy', :as => :signout
  get '/auth/failure' => 'sessions#failure'
  post '/set_location_data' => 'sessions#location_data'
  get '/set_location_data' => 'sessions#location_data'
  root 'welcome#landing_page'
end
