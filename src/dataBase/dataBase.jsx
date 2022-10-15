/*------------------base  de datos provisoria--------------- */

export const dataBase = [
    
    {
       id: 1,
       name:  "Hotel Paraiso",
       image: "http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
       qualification: 4,
       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas illum molestiae praesentium repudiandae consectetur ab qui, porro ipsam hic a cumque quas. Obcaecati neque praesentium numquam sed. Harum, modi.",
       location: {
            city:"tailandia",
           country:"Singapur",
           continent: "Asia",
       },
       services: [
           {
               name:"spa",
               image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
               description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
           },
           {
               name:"masajes",
               image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
               description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
           },

       ],
       rooms:[
               {
                   id: "11",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "Presidential Siute",
                   discount: true,
                   price: 300,
                   description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
                   category: {
                       id:"hgb145",
                       name:"presidential"
                   },
                   services: [ {
                       id: "hdfhf5245",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "2354vsxdv",
                       image:"iconos",
                       name:"tv",
                   }],
                       
               },
               {
                   id: "12",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "standard",
                   category: "Family",
                   price: 100,
                   services: [ {
                       id: "hdfhf5245",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "2354vsxdv",
                       image:"iconos",
                       name:"tv",
                   }],
               },
               {
                   id: "13",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "gold",
                   category: "Dobles",
                   price: 200,
                   services: [ {
                       id: "hdfhf5245",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "2354vsxdv",
                       image:"iconos",
                       name:"tv",
                   }],
               },
               
       ]

   }, 
   {
       id: 2,
       name:  "Hotel Patricio",
       image: "http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
       qualification: 4,
       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas illum molestiae praesentium repudiandae consectetur ab qui, porro ipsam hic a cumque quas. Obcaecati neque praesentium numquam sed. Harum, modi.",
       location: {
           name:"Singapur",
           url: "url de la localizacion",
       },
       services: [
           {
               name:"spa",
               image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
               description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
           },
           {
               name:"masajes",
               image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
               description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
           },

       ],
       rooms:[
               {
                   id: "21",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "Presidential Siute",
                   discount: true,
                   price: 300,
                   description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
                   category: {
                       id:"hg145",
                       name:"presidential"
                   },
                   services: [ {
                       id: "hdfh5245",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "2354vxdv",
                       image:"iconos",
                       name:"tv",
                   }],
                       
               },
               {
                   id: "22",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "standard",
                   category: "Family",
                   price: 100,
                   services: [ {
                       id: "hdfhf245",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "234vsxdv",
                       image:"iconos",
                       name:"tv",
                   }],
               },
               {
                   id: "23",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "gold",
                   category: "Dobles",
                   price: 200,
                   services: [ {
                       id: "hdfhf245",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "254vsxdv",
                       image:"iconos",
                       name:"tv",
                   }],
               },
               
       ]

   },
   {
       id: 3,
       name:  "Hotel Paraiso",
       image: "http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
       qualification: 4,
       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas illum molestiae praesentium repudiandae consectetur ab qui, porro ipsam hic a cumque quas. Obcaecati neque praesentium numquam sed. Harum, modi.",
       location: {
           name:"Singapur",
           url: "url de la localizacion",
       },
       services: [
           {
               name:"spa",
               image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
               description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
           },
           {
               name:"masajes",
               image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
               description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
           },

       ],
       rooms:[
               {
                   id: "31",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "Presidential Siute",
                   discount: true,
                   price: 300,
                   description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
                   category: {
                       id:"hgb15",
                       name:"presidential"
                   },
                   services: [ {
                       id: "hdfhf245",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "2354vxdv",
                       image:"iconos",
                       name:"tv",
                   }],
                       
               },
               {
                   id: "32",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "standard",
                   category: "Family",
                   price: 100,
                   services: [ {
                       id: "hdhf5245",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "235vsxdv",
                       image:"iconos",
                       name:"tv",
                   }],
               },
               {
                   id: "33",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "gold",
                   category: "Dobles",
                   price: 200,
                   services: [ {
                       id: "hdfhf45",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "254vsdv",
                       image:"iconos",
                       name:"tv",
                   }],
               },
               
       ]

   },
   {
       id: 4,
       name:  "Hotel Paraiso",
       image: "http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
       qualification: 4,
       description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas illum molestiae praesentium repudiandae consectetur ab qui, porro ipsam hic a cumque quas. Obcaecati neque praesentium numquam sed. Harum, modi.",
       location: {
           name:"Singapur",
           url: "url de la localizacion",
       },
       services: [
           {
               name:"spa",
               image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
               description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
           },
           {
               name:"masajes",
               image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
               description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
           },

       ],
       rooms:[
               {
                   id: "41",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "Presidential Siute",
                   discount: true,
                   price: 300,
                   description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptas ",
                   category: {
                       id:"hgb15",
                       name:"presidential"
                   },
                   services: [ {
                       id: "hdfhf245",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "234vsdv",
                       image:"iconos",
                       name:"tv",
                   }],
                       
               },
               {
                   id: "42",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "standard",
                   category: "Family",
                   price: 100,
                   services: [ {
                       id: "hdfhf545",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "2354vdv",
                       image:"iconos",
                       name:"tv",
                   }],
               },
               {
                   id: "43",
                   image:"http://thehalalworld.com/uploads/pages/Amadeus-Study-Highlights-The-Needs-of-Halal-Travellers.jpg",
                   name: "gold",
                   category: "Dobles",
                   price: 200,
                   services: [ {
                       id: "hdfhf45",
                       image:"iconos",
                       name:"wifi",
                   }, 
                   {
                       id: "235sxdv",
                       image:"iconos",
                       name:"tv",
                   }],
               },
               
       ]

   },  
   
]