const convertDate = (isoDate) => {
  const date = new Date(isoDate)
  const months = [
    'STYCZEŃ',
    'LUTY',
    'MARZEC',
    'KWIECIEŃ',
    'MAJ',
    'CZERWIEC',
    'LIPIEC',
    'SIERPIEŃ',
    'WRZESIEŃ',
    'PAŹDZIERNIK',
    'LISTOPAD',
    'GRUDZIEŃ',
  ]
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export default convertDate
