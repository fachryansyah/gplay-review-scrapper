const gplay = require('google-play-scraper')
const excel = require('excel4node')
const appPackage = 'com.telkom.tracencare'

let column = [
  'username',
  'avatar',
  'rating',
  'url',
  'comment'
]
let data

const startStealData = async () => {
  await gplay.reviews({
    appId: appPackage,
    sort: gplay.sort.RATING,
    num: 10000
  }).then((result) => {
    data = result
  })
  exportToExcel()
}

const exportToExcel = () => {
  const wb = new excel.Workbook();
  const ws = wb.addWorksheet('Sheet 1')

  // generate column for excel
  column.forEach((item, key) => {
    ws.cell(1, key + 1).string(item)
  })

  // generate data to excel
  data.forEach((item, key) => {
    ws.cell(key + 2, 1).string(item.userName)
    ws.cell(key + 2, 2).string(item.userImage)
    ws.cell(key + 2, 3).string(item.scoreText)
    ws.cell(key + 2, 4).string(item.url)
    ws.cell(key + 2, 5).string(item.text)
  })

  wb.write('output-data.xlsx')
}

startStealData()