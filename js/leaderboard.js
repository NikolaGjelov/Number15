
  let leaderbord = document.querySelector(".table")
  let score = JSON.parse(localStorage.getItem("playerScore"))
  console.log(score)
  tableContainer = `
<tr>
  <th>Place</th>
  <th>Name</th>
  <th>Moves</th>
</tr>
  `
 score.sort((a, b) => {
  return a.moves - b.moves
})

  for (let i = 0; i < score.length; i++){
let displayOnePlayerScore = `
<tr>
  <td>${[i+1]}</td>
  <td>${score[i].player}</td>
  <td>${score[i].moves}</td>
</tr>
  `
  leaderbord.innerHTML += displayOnePlayerScore
  }
 
