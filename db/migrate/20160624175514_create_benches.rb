class CreateBenches < ActiveRecord::Migration
  def change
    create_table :benches do |t|
      t.float :lat, null: false
      t.float :lng, null: false
      t.text :description, null: false

      t.timestamps null: false
    end
  end
end
