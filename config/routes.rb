Rails.application.routes.draw do
  resources :sales
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }
  root to: 'home#index'
end
