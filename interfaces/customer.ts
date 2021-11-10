export class Customer {
  id: number
  name: string
  surname: string
  email: string
  phone: string
  birth: string
  postalCode: string
  registerDate: Date

  constructor(props: Customer) {
    this.id = props.id
    this.name = props.name
    this.surname = props.surname
    this.email = props.email
    this.phone = props.phone
    this.birth = props.birth
    this.postalCode = props.postalCode
    this.registerDate = new Date()
  }
}
