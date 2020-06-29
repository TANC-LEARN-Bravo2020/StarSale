class SalesController < ApplicationController
    def index
        @sales = Sale.all
        render json: @sales
    end

    


end
