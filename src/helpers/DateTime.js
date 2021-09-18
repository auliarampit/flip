import NameOfMonth from '../assets/dummy/NamOfMonth'

const CustomDateTime = (data) => {
    if (data) {
        let date = null
        let month = null
        let year = null

        data.map((i) => {
            return date = i.completed_at.slice(8, 10)

        })

        data.map((i) => {
            return month = i.completed_at.slice(5, 7)

        })

        data.map((i) => {
            return year = i.completed_at.slice(0, 4)

        })

        let dateTime = null

        NameOfMonth.map((i) => {
            if (i.id === month) {
                return dateTime = date + ' ' + i.name + ' ' + year
            }
        })

        return dateTime
    }
}

export default CustomDateTime