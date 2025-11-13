export default function Profile(props){
  return (
    <div id='profile' style={profileStyle}>
      <img src={null} alt='' />
      <div>
        <h1>{props.userName}</h1>
        <div>
            <span>Net Income: {props.net}</span>
            <span>Total Income: {props.income}</span>
            <span>Total Expense: {props.expense}</span>
        </div>
      </div>
    </div>
  )
}

const profileStyle={
  width: "100%",
  borderBottom: "2px solid black",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "32px",
  padding: "8px",
  boxShadow: "inset 0px -5px 2px rgba(0, 0, 0, 0.2)"
}