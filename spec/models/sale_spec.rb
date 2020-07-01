require 'rails_helper'

RSpec.describe Sale, type: :model do
  describe 'Sale' do

    it 'has to be real' do
      expect{ Sale.new }.to_not raise_error
    end
  
  
     it 'has a address' do
      my_sale = Sale.new
      my_sale.address = '123 main st'
      expect(my_sale.address).to be_a String
      expect(my_sale.address).to eq '123 main st'
    end

    it 'has a city' do
      my_sale = Sale.new
      my_sale.city = 'san diego'
      expect(my_sale.city).to be_a String
      expect(my_sale.city).to eq 'san diego'
    end

    it 'has a state' do
      my_sale = Sale.new
      my_sale.state = 'California'
      expect(my_sale.state).to be_a String
      expect(my_sale.state).to eq 'California'
    end

    it 'has a zip' do
      my_sale = Sale.new
      my_sale.zip = 92103
      expect(my_sale.zip).to be_a Integer
      expect(my_sale.zip).to eq 92103
    end

    it 'has a date' do
      my_sale = Sale.new
      my_sale.date = Date.new(2020,07,11)
      expect(my_sale.date).to be_a Date
      expect(my_sale.date).to eq Date.new(2020,07,11)
    end

    it 'has a duration' do
      my_sale = Sale.new
      my_sale.duration = "9 am - 5 pm"
      expect(my_sale.duration).to be_a String
      expect(my_sale.duration).to eq "9 am - 5 pm"
    end

    it 'has a title' do
      my_sale = Sale.new
      my_sale.title = "lots of shoes"
      expect(my_sale.title).to be_a String
      expect(my_sale.title).to eq "lots of shoes"
    end

    it 'has a payment_type' do
      my_sale = Sale.new
      my_sale.payment_type = "paypal"
      expect(my_sale.payment_type).to be_a String
      expect(my_sale.payment_type).to eq "paypal"
    end

    it 'has a img' do
      my_sale = Sale.new
      my_sale.img = "image goes here"
      expect(my_sale.img).to be_a String
      expect(my_sale.img).to eq "image goes here"
    end

    it 'has a user_id' do
      my_sale = Sale.new
      my_sale.user_id = 1
      expect(my_sale.user_id).to be_a Integer
      expect(my_sale.user_id).to eq 1
    end
  
  end
end
