class CreateSales < ActiveRecord::Migration[6.0]
  def change
    create_table :sales do |t|
      t.string :address
      t.string :city
      t.string :state
      t.integer :zip
      t.date :date
      t.string :duration
      t.string :title
      t.text :description
      t.string :payment_type
      t.string :img
      t.integer :user_id

      t.timestamps
    end
  end
end
