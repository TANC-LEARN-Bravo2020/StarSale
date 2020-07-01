require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'User' do
    it 'has to be real' do
      expect{ User.new }.to_not raise_error
    end


    it 'has a email' do
      new_user = User.new
      new_user.email = 'nbizzy@gmail.com'
      expect(new_user.email).to be_a String
      expect(new_user.email).to eq 'nbizzy@gmail.com'
      expect(new_user.email).not_to be_empty
    end

    it 'has a password' do
      new_user = User.new
      new_user.password = 'test123'
      expect(new_user.password).to be_a String
      expect(new_user.password).not_to be_empty
    end

    it 'has a name' do
      new_user = User.new
      new_user.name = 'Bobby'
      expect(new_user.name).to be_a String
      expect(new_user.name).to eq 'Bobby'
      expect(new_user.name).not_to be_empty
     end

    it 'has a phone' do
      new_user = User.new
      new_user.phone = '111-111-1111'
      expect(new_user.phone).to be_a String
      expect(new_user.phone).to eq '111-111-1111'
      expect(new_user.phone).not_to be_empty
    end


  end
end
