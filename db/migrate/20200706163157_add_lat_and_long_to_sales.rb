class AddLatAndLongToSales < ActiveRecord::Migration[6.0]
  def change
    add_column :sales, :latitude, :decimal
    add_column :sales, :longitude, :decimal

  end
end
