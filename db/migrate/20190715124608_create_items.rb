class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :upc, null: false
      t.string :name
      t.string :description
      t.string :url

      t.timestamps
    end
  end
end
