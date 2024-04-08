import {Lawyer} from '../types/lawyer'

const getLawyers = () => {
    const greg: Lawyer = {firstName:'Greg', lastName:'Evans', firm:'EPFL', contact: {
        phoneNumber: '204-479-2958',
        address: '193 Sherbrook St',
        city: 'Winnipeg',
        province: 'MB',
        postalCode: 'R2H2N5',
        fax: 'LOL',
        email: 'greg@epfl.ca'
      }, status:'Practising', history:'Lots'}

      const richard: Lawyer = {firstName:'Richard', lastName:'Pollock', firm:'EPFL', contact: {
        phoneNumber: '204-509-6443',
        address: '193 Sherbrook St',
        city: 'Winnipeg',
        province: 'MB',
        postalCode: 'R2H2N5',
        fax: 'LOL',
        email: 'richard@epfl.ca'
      }, status:'Practising', history:'Less than Greg'}

      const mockData = [
        greg,
        richard
      ]

      return mockData
}

export{
    getLawyers
}