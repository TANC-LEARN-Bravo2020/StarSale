class FavoriteController < ApplicationController
    before_action :authenticate_user!, only: [:create, :destroy, :index]
  
    def index
      favorites = current_user.favorites.all
      render json: favorites
    end
  
    def create
      favorite = current_user.favorites.create(favorite_params)
      if favorite.valid?
        render json: favorite
      else
        render json: favorite.errors, status: 422
      end
    end
  
    def destroy
      favorite = current_user.favorites.find(params[:id])
      if favorite.destroy
        render json: favorite
      else
        render json: favorite.errors, status: 422
      end
    end
  
    private
    def favorite_params
      params.require(:favorite).permit(:sale_id, :user_id)
    end
  
  end
  