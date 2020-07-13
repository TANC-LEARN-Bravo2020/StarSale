require 'rails_helper'

RSpec.describe Favorite, type: :model do
  # 
  it { should belong_to(:user) }

  it { should have_db_column(:sale_id) }
  it { should have_db_column(:user_id) }



end
