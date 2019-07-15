# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(name: 'Richard Davis', email: 'rd@example.com')

items = [
  { upc: '1', name: 'Shoes', description: 'Goes on yr feet', url: 'zappos.com' },
  { upc: '2', name: 'Socks', description: 'Also go on yr feet', url: 'amazon.com' },
  { upc: '3', name: 'Hat', description: 'Goes on yr head', url: 'lidzcaps.com' },
  { upc: '4', name: 'Shirt', description: 'Goes over yr head', url: 'customink.com' },
]

items.each do |item_attrs|
  Item.create(item_attrs)
end
