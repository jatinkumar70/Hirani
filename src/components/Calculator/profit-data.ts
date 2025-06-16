export const getCities = (): string[] => {
  return Array.from(new Set(propertyData.map((item) => item.city)))
}

export const getAreasByCity = (city: string): string[] => {
  return Array.from(new Set(propertyData.filter((item) => item.city === city).map((item) => item.area)))
}


export interface DiscountType {
  bedroom: string;
  rev1: string;
  rev2: string;
  occu_rate: string;
  currency: string;
}
export interface PropertyData {
  id: number
  city: string
  area: string
  item: DiscountType[]

}

export const propertyData: PropertyData[] = [
  {
    id: 1,
    city: 'Dubai',
    area: 'Dubai Downtown',
    item: [
      {
        bedroom: '5 Bedroom',
        rev1: '638,000',
        rev2: '766,000',
        occu_rate: '85%',
        currency: 'AED'
      }
    ]
  },
  {
    id: 2,
    city: 'Dubai',
    area: 'Dubai Marina',
    item: [
      {
        bedroom: 'Studio',
        rev1: '75,000',
        rev2: '90,000',
        occu_rate: '63%',
        currency: 'AED'
      },
      {
        bedroom: '1 Bedroom',
        rev1: '105,000',
        rev2: '126,000',
        occu_rate: '57%',
        currency: 'AED'
      },
      {
        bedroom: '2 Bedroom',
        rev1: '105,000',
        rev2: '126,000',
        occu_rate: '57%',
        currency: 'AED'
      },
      {
        bedroom: '3 Bedroom',
        rev1: '177,000',
        rev2: '213,000',
        occu_rate: '53%',
        currency: 'AED'
      },
      {
        bedroom: '4 Bedroom',
        rev1: '285,000',
        rev2: '342,000',
        occu_rate: '52%',
        currency: 'AED'
      }
    ]
  }, {
    id: 3,
    city: 'Dubai',
    area: 'Jumeirah Lakes Towers',
    item: [
      {
        bedroom: 'Studio',
        rev1: '55,000',
        rev2: '66,000',
        occu_rate: '68%',
        currency: 'AED'
      },
      {
        bedroom: '1 Bedroom',
        rev1: '69,000',
        rev2: '83,000',
        occu_rate: '57%',
        currency: 'AED'
      }, {
        bedroom: '2 Bedroom',
        rev1: '69,000',
        rev2: '83,000',
        occu_rate: '57%',
        currency: 'AED'
      },
      {
        bedroom: '3 Bedroom',
        rev1: '156,000',
        rev2: '187,000',
        occu_rate: '47%',
        currency: 'AED'
      }
    ]
  }, {
    id: 4,
    city: 'Dubai',
    area: 'Palm Jumeirah',
    item: [
      {
        bedroom: 'Studio',
        rev1: '96,000',
        rev2: '114,000',
        occu_rate: '63%',
        currency: 'AED'
      },
      {
        bedroom: '1 Bedroom',
        rev1: '152,000',
        rev2: '182,000',
        occu_rate: '63%',
        currency: 'AED'
      }, {
        bedroom: '2 Bedroom',
        rev1: '152,000',
        rev2: '182,000',
        occu_rate: '63%',
        currency: 'AED'
      }, {
        bedroom: '3 Bedroom',
        rev1: '300,000',
        rev2: '360,000',
        occu_rate: '61%',
        currency: 'AED'
      }, {
        bedroom: '4 Bedroom',
        rev1: '550,000',
        rev2: '659,000',
        occu_rate: '44%',
        currency: 'AED'
      }, {
        bedroom: '5 Bedroom',
        rev1: '1,077,000',
        rev2: '1,292,000',
        occu_rate: '65%',
        currency: 'AED'
      }
    ]
  }, {
    id: 5,
    city: 'Dubai',
    area: 'Business Bay',
    item: [
      {
        bedroom: 'Studio',
        rev1: '77,566',
        rev2: '1,00,836',
        occu_rate: '79%',
        currency: 'AED'
      },
      {
        bedroom: '1 Bedroom',
        rev1: '93,258',
        rev2: '1,21,235',
        occu_rate: '73%',
        currency: 'AED'
      }, {
        bedroom: '2 Bedroom',
        rev1: '1,53,300',
        rev2: '1,99,290',
        occu_rate: '70%',
        currency: 'AED'
      }, {
        bedroom: '3 Bedroom',
        rev1: '1,70,820',
        rev2: '2,22,066',
        occu_rate: '65%',
        currency: 'AED'
      }
    ]
  }
  , {
    id: 6,
    city: 'Dubai',
    area: 'City Walk',
    item: [
      {
        bedroom: 'Studio',
        rev1: '87,016',
        rev2: '1,13,121',
        occu_rate: '80%',
        currency: 'AED'
      },
      {
        bedroom: '1 Bedroom',
        rev1: '1,35,506',
        rev2: '1,76,158',
        occu_rate: '75%',
        currency: 'AED'
      },
      {
        bedroom: '2 Bedroom',
        rev1: '2,06,444',
        rev2: '2,68,377',
        occu_rate: '70%',
        currency: 'AED'
      },
      {
        bedroom: '3 Bedroom',
        rev1: '2,61,851',
        rev2: '3,40,406',
        occu_rate: '68%',
        currency: 'AED'
      },
      {
        bedroom: '4 Bedroom',
        rev1: '3,44,487',
        rev2: '5,51,179',
        occu_rate: '65%',
        currency: 'AED'
      }
    ]
  }, {
    id: 7,
    city: 'Dubai',
    area: 'DIFC',
    item: [
      {
        bedroom: 'Studio',
        rev1: '89,626',
        rev2: '1,16,514',
        occu_rate: '80%',
        currency: 'AED'
      },
      {
        bedroom: '1 Bedroom',
        rev1: '1,39,571',
        rev2: '1,81,443',
        occu_rate: '75%',
        currency: 'AED'
      },
      {
        bedroom: '2 Bedroom',
        rev1: '2,12,637',
        rev2: '2,76,429',
        occu_rate: '70%',
        currency: 'AED'
      },
      {
        bedroom: '3 Bedroom',
        rev1: '2,69,707',
        rev2: '3,50,618',
        occu_rate: '68%',
        currency: 'AED'
      },
      {
        bedroom: '4 Bedroom',
        rev1: '3,54,822',
        rev2: '5,32,232',
        occu_rate: '65%',
        currency: 'AED'
      }
    ]
  }, {
    id: 8,
    city: 'Dubai',
    area: 'Downtown',
    item: [
      {
        bedroom: 'Studio',
        rev1: '87,016',
        rev2: '1,13,121',
        occu_rate: '80%',
        currency: 'AED'
      },
      {
        bedroom: '1 Bedroom',
        rev1: '1,35,506',
        rev2: '1,76,158',
        occu_rate: '75%',
        currency: 'AED'
      },
      {
        bedroom: '2 Bedroom',
        rev1: '2,06,444',
        rev2: '2,68,377',
        occu_rate: '70%',
        currency: 'AED'
      },
      {
        bedroom: '3 Bedroom',
        rev1: '2,61,851',
        rev2: '3,66,591',
        occu_rate: '68%',
        currency: 'AED'
      },
      {
        bedroom: '4 Bedroom',
        rev1: '3,44,487',
        rev2: '5,51,179',
        occu_rate: '65%',
        currency: 'AED'
      }
    ]
  }


]

// Helper functions to get unique values
// export const getCities = (): string[] => {
//   return Array.from(new Set(propertyData.map((item) => item.city)))
// }

// export const getAreasByCity = (city: string): string[] => {
//   return Array.from(new Set(propertyData.filter((item) => item.city === city).map((item) => item.area)))
// }

// export const getBedroomsByArea = (city: string, area: string): string[] => {
//   return Array.from(new Set(propertyData.filter((item) => item.city === city && item.area === area).map((item) => item.bedroom)))
// }

// export const getBathroomsByAreaAndBedroom = (city: string, area: string, bedroom: string): string[] => {
//   return Array.from(
//     new Set(
//       propertyData
//         .filter((item) => item.city === city && item.area === area && item.bedroom === bedroom)
//         .map((item) => item.bathroom || "")
//     )
//   )
// }

// export const getPropertyData = (city: string, area: string, bedroom: string): PropertyData | undefined => {
//   return propertyData.find((item) => item.city === city && item.area === area && item.bedroom === bedroom)
// }

