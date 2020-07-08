class Sale < ApplicationRecord
    belongs_to :user
    validates :address, :city, :state, :zip, :date, :duration, :title, :description, :payment_type, presence: true
end
