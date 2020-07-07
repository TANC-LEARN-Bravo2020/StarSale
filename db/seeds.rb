users = [
    {
        email:"test1@test.com",
        password:"test111",
        password_confirmation:"test111",
        name:"Nick",
        phone:"857-093-0928"
    },
    {
        email:"test2@test.com",
        password:"test222",
        password_confirmation:"test222",
        name:"Max",
        phone:"555-556-7897"
    },
    {
        email:"test3@test.com",
        password:"test333",
        password_confirmation:"test333",
        name:"John",
        phone:"676-928-8234"
    },
    {
        email:"test4@test.com",
        password:"test444",
        password_confirmation:"test444",
        name:"Jane",
        phone:"230-059-9035"
    },
    {
        email:"test5@test.com",
        password:"test555",
        password_confirmation:"test555",
        name:"Chris",
        phone:"985-893-7583"
    }
]

users.each do |attributes|
    User.create(attributes)
end

a=User.first
b=User.second
c=User.last

nick_sales = [
    {
        address:"2920 Zoo Dr",
        city:"San Diego",
        state:"CA",
        zip:"92101",
        date:Date.new(2020,07,11),
        duration:"9am-4pm",
        title:"Selling the animals",
        description:"We got too many animals.  They must go.",
        payment_type:"Cash only",
        img:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/San_Diego_Zoo_Street_Sign.jpg/440px-San_Diego_Zoo_Street_Sign.jpg",
        latitude:32.735279,
        longitude:-117.149109
    },
    {
        address:"2804 Adams Ave",
        city:"San Diego",
        state:"CA",
        zip:"92116",
        date:Date.new(2020,05,14),
        duration:"9am-5pm",
        title:"Food",
        description:"Casual cafe with housemade sweets & sandwiches, plus custom-designed cakes for special occasions.",
        payment_type:"Cash or Card",
        img:"https://www.bakingbusiness.com/ext/resources/2019/8/08192019/GlobalTrends.jpg?1566494557",
        latitude:32.763060,
        longitude:-117.133700
    }
]

nick_sales.each do |attributes|
    a.sales.create(attributes)
end

max_sales = [
    {
        address:"11463 Westonhill Drive",
        city:"San Diego",
        state:"CA",
        zip:"92126",
        date:Date.new(2021,04,22),
        duration:"9am-4pm",
        title:"Selling old furniture",
        description:"Moving out, some of the old furniture has to go.",
        payment_type:"Cash only",
        img:"https://www.newcitymovers.com/content/uploads/2018/08/Yard-Sale.jpg",
        latitude:32.933331,
        longitude:-117.135361
    },
    {
        address:"10 Rockefeller Plaza",
        city:"New York",
        state:"NY",
        zip:"10020",
        date:Date.new(2021,07,18),
        duration:"9am-5pm",
        title:"Selling games",
        description:"Come get the latest and greatest games",
        payment_type:"Cash or Card",
        img:"https://www.nintendonyc.com/_ui/img/about-us/store-2.jpg",
        latitude:40.758282,
        longitude:-73.979156
    },
    {
        address:"4102 S University Dr",
        city:"Pomona",
        state:"CA",
        zip:"91768",
        date:Date.new(2020,07,30),
        duration:"9am-6pm",
        title:"Selling Food",
        description:"Grocery shop at Cal Poly Pomona offering locally grown produce, plus gift baskets & deli sandwiches.",
        payment_type:"Cash or Card",
        img:"https://www.click2houston.com/resizer/l0PBghlv66InIMbhzJGVxpWU8DI=/1600x1066/smart/filters:format(jpeg):strip_exif(true):strip_icc(true):no_upscale(true):quality(65)/arc-anglerfish-arc2-prod-gmg.s3.amazonaws.com/public/YLLBZGQFHFFINGUNGATQV5F3V4.jpg",
        latitude:34.06207,
        longitude:-117.81488
    }
]

max_sales.each do |attributes|
    b.sales.create(attributes)
end

chris_sales = [
    {
        address:"1600 W Monroe St",
        city:"Phoenix",
        state:"Arizona",
        zip:"85007",
        date:Date.new(2020,07,19),
        duration:"9am-5pm",
        title:"Helping with taxes",
        description:"We will tax you, come have a good time!",
        payment_type:"Cash, Card or Check",
        img:"https://arizonadailyindependent.com/wp-content/uploads/2016/09/IRSBuildingPhx.png",
        latitude:33.45028,
        longitude:-112.09469
    },
    {
        address:"4496 Park Blvd",
        city:"San Diego",
        state:"CA",
        zip:"92116",
        date:Date.new(2020,07,29),
        duration:"9am-10pm",
        title:"Selling food and a good time",
        description:"Open 24/7, this cafe presents coffee & light eats along with live music & free WiFi.",
        payment_type:"Cash or Card",
        img:"https://perfectdailygrind.com/wp-content/uploads/2019/11/Coffeeshop-Tips-06.jpg",
        latitude:32.75891,
        longitude:-117.14625
    }
]

chris_sales.each do |attributes|
    c.sales.create(attributes)
end
