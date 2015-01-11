Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, "333447116862105", "4f92f70361d179ce18c5f33945a2b54a",
    :scope => 'email,user_birthday,read_stream', :info_fields => 'email,devices'
end 
