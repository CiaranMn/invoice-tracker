const { Invoice } = require('./invoice')
Invoice.deleteMany({}, () => {
     console.log('Database wiped, seeding.')
     Invoice.create([
       {
         company: "ABC Construction",
         value: 500,
         service: "Supply of cement",
         due: "2018-12-28"
       }, {
         company: "Johnson & Johnson LLP",
         value: 100,
         service: "Taxi to Heathrow Airport",
         due: "2019-01-05"
       }, {
         company: "Speedy Cabs",
         value: 2000,
         service: "Fleet Maintenance",
         due: "2019-02-01"
       }, {
         company: "Smith & Sons",
         value: 2500,
         service: "Arbitration",
         due: "2019-01-14"
       }, {
         company: "Greg's the Barker",
         value: 80,
         service: "Dog bones (for dogs not of dogs)",
         due: "2018-11-10",
         paidStatus: true,
         paidDate: "2018-11-11"
       }, {
         company: "Nakatomi Corp.",
         value: 5000,
         service: "Security consultancy",
         due: "2018-11-02",
         paidStatus: true,
         paidDate: "2018-11-01"
       }
     ])
})

