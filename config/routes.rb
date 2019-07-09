Rails.application.routes.draw do
  require "sidekiq/web"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "students#index"
  mount Sidekiq::Web, at: "/sidekiq"

  namespace :api, defaults: { format: :json } do
    resources :students, only: [:index, :create, :update] do
      collection do
        post :_search
        post :export_students
        post :import_students
      end
    end
  end
end
