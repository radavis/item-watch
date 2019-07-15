Rails.application.routes.draw do
  resources :items

  resources :users do
    resources :items, controller: 'user_items'
  end
end
