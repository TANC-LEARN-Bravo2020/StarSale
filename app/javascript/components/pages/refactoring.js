let response = {
    //LEVEL 1
    "info": {
        "statuscode": 0,
        "copyright": {
            "text": "© 2020 MapQuest, Inc.",
            "imageUrl": "http://api.mqcdn.com/res/mqlogo.gif",
            "imageAltText": "© 2020 MapQuest, Inc."
        },
        "messages": []
    },
    //LEVEL 2
    "options": {
        "maxResults": -1,
        "thumbMaps": false,
        "ignoreLatLngInput": false
    },
    //LEVEL 3 has array of 1 object [0]
    "results": [
        //object
      {
          //level 1
        "providedLocation": {
          "location": "840 17th St, San Diego, CA"
        },
          //level 2 [0].latLng.lat
        "locations": [
          {
            "street": "840 17th St",
            "adminArea6": "",
            "adminArea6Type": "Neighborhood",
            "adminArea5": "San Diego",
            "adminArea5Type": "City",
            "adminArea4": "San Diego",
            "adminArea4Type": "County",
            "adminArea3": "CA",
            "adminArea3Type": "State",
            "adminArea1": "US",
            "adminArea1Type": "Country",
            "postalCode": "92101-6600",
            "geocodeQualityCode": "P1AAA",
            "geocodeQuality": "POINT",
            "dragPoint": false,
            "sideOfStreet": "L",
            "linkId": "r7188322|p103299812|n8737726",
            "unknownInput": "",
            "type": "s",
            "latLng": {
              "lat": 32.71426,
              "lng": -117.148493
            },
            "displayLatLng": {
              "lat": 32.714263,
              "lng": -117.148861
            }
          }
        ]
      }
    ]
  }

  console.log(response.results[0].locations[0].latLng)