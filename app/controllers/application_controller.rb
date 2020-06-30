class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    protect_from_forgery with: :exception

    before_filter :configure_permitted_parameters, if: :devise_controller?

    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :phone]) 
        devise_parameter_sanitizer.permit(:account_update, keys: [:name, :phone]) 
    end
end
