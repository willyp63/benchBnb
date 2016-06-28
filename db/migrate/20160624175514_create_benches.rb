class CreateBenches < ActiveRecord::Migration
  def change
    create_table :benches do |t|
      t.float :lat, null: false
      t.float :lng, null: false
      t.text :description, null: false
      t.integer :num_seats, null: false
      t.string :image_url

      t.timestamps null: false
    end
  end
end
