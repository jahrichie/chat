class AddSerializedLocationToUsers < ActiveRecord::Migration
  def change
    add_column :users, :serialized_location, :string
  end
end
