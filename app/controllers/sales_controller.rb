class SalesController < ApplicationController
before_action :authenticate_user!, only: [:create]

    def index
        @sales = Sale.all
        render json: @sales
    end

    def show
    sale = Sale.find(params[:id])
    render json: sale
    end

    def create
        sale = current_user.sales.create(sale_params)
        if sale.valid? 
            render json: sale
        else
            render json: sale.errors, status: 403
        end
    end

    def destroy
        sale = Sale.find(params[:id])
        if sale.destroy
            render json: sale
        else
            render json: sale.errors
        end
    end

    def update
        sale = Sale.find(params[:id])
        sale.update(sale_params)
        if sale.valid?
            render json: sale
        else
            render json: sale.errors
        end
    end


    private
    def sale_params
        params.require(:sale).permit(:address, :city, :state, :zip, :date, :duration, :title, :description, :payment_type, :img, :latitude, :longitude)
    end
end
