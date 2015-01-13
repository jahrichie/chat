if Rails.env.development?
  fb_app_id = "333755460164604"
  fb_app_secret = "2d1b3189f8475b640e3424c51e0b37bf"
else
  fb_app_id = "333447116862105"
  fb_app_secret = "4f92f70361d179ce18c5f33945a2b54a"
end

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, fb_app_id, fb_app_secret,
    :scope => 'email,user_birthday,read_stream', :info_fields => 'email,devices'
end 
