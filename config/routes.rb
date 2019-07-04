Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "students#index"

  namespace :api, defaults: { format: :json } do
    resources :students, only: [:index, :create, :update] do
      collection do
        post :_search
      end
    end
  end
end
