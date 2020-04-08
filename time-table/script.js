const container = document.getElementById('container')
const error = document.getElementById('error')
const notice = document.getElementById('notice')
const login = document.getElementById('login')
const submit = document.getElementById('submit')
const close = document.getElementById('close')
const timetable = document.getElementById('timetable')


function init() {
  let data = JSON.parse(localStorage.getItem('timetable')) || []
  if(data.length > 0) {
    loadDataToDOM(data)
  }
}
init()

function loadDataToDOM(data) {
  notice.style.display = "none"
  let table = [];
  [2,3,4,5,6,7].map( (date) => {
    table[`${date}`] = []
    data.forEach( (course) => {
      if(course.weekdays == date) {
        table[`${date}`].push(course)
      }
    })
  })
  console.log(table)
  container.innerHTML = `<div class="timetable">${
    table.map( (date) => `
      <div class="timetable-section">
        <p class="date">Thứ ${table.indexOf(date)}</p>
        <div class="course-list">
        ${date.length > 0 ? date.map( course => `
          <div class="course" tabindex="0">
            <div class="name">${course.name}</div>
              <div class="room">Phòng học: ${course.room}</div>
              <div class="teacher">Giáo viên: ${course.teacher}</div>
              <div class="extend-info">
                <div class="code">Mã học phần: ${course.code}</div>
                <div class="class">Lớp học phần: ${course.class}</div>
                <div class="dayStart">Ngày bắt đầu học: ${course.dayStart}</div>
                <div class="credit">Số tín chỉ: ${course.credit}</div>
              </div>
              <div class="time">Giờ học: ${covertToTime(course.time)}</div>
          </div>
        `).join('') : `<div class="empty">Không có tiết học nào</div>`} 
        </div>
      </div>
    `).join('')
  }</div>`
}

async function getData() {
  const username = document.getElementById('username')
  const password = document.getElementById('password')
  if(username.value == "" || password.value == "") {
    error.innerText = "Mssv/mật khẩu không thể để trống"
    return
  }
  error.innerHTML = `<div class="loader"></div>`
  await fetch(`https://ntu-time-table.herokuapp.com/api/${username.value}-${password.value}`)
  .then(res => res.json())
  .then(body => {
    if(body.length == 0) {
      error.innerText = "Sai tài khoản/mật khẩu"
    } else {
      localStorage.setItem('timetable', JSON.stringify(body))
      loadDataToDOM(body)
      modal.style.display = 'none'
    }
  })
}
login.addEventListener('click', () => {
  modal.style.display = 'block'
})
close.addEventListener('click', () => {
  error.innerHTML = ""
  error.innerText = ""
  modal.style.display = 'none'
})
submit.addEventListener('click', getData)

function covertToTime(c) {
  const startTime = ['7:00', '7:55', '8:50', '9:40', '10:35', '1:00', '1:55', '2:50', '3:40', '4:35']
  const endTime = ['7:50', '8:45', '9:35', '10:30', '11:25', '1:500', '2:45', '3:35', '4:30', '5:25']
  return `${startTime[c[0]-1]} - ${endTime[c[c.length-1]-1]}`
}