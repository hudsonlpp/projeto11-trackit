import Habit from "../../components/habit/Habit";
import NewTask from "../../components/newtask/NewTask";
import { StyledDiv } from "./styled";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authentication";
import Loading from "../loading/Loading";


export default function Habits() {
	const [selected, setSelected] = useState([]);
	const [habitName, setHabitName] = useState("");
	const [expand, setExpand] = useState(0);
	const [habits, setHabits] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const none = (
		<p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito paracomeçar a trackear!</p>
	);
	const navigate = useNavigate();
	const {setVisible, config} = useContext(AuthContext);
	useEffect(() => {
		setVisible(true);
		axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
		.then((response) => {
			setHabits(response.data);
		})
		.catch(() => {
			alert("Erro ao requisitar dados do servidor. Por favor logue novamente.");
			navigate("/");
		});
	},[expand, loading, config, navigate, setVisible]);

	if(habits === undefined || loading === true) {
		return <Loading />;
	}
	const hNumber = habits.length;

	return (
		<StyledDiv>
			<div>
				<h1>Meus hábitos</h1>
				<button data-test="habit-create-btn" onClick={() => {setExpand(1);}}>
					+
				</button>
			</div>
			<NewTask
				expand={expand}
				setExpand={setExpand}
				selected={selected}
				setSelected={setSelected}
				habitName={habitName}
				setHabitName={setHabitName}
			/>
			{hNumber === 0 && none}
			{habits.map((habit) => (<Habit key={habit.id} name={habit.name} id={habit.id} days={habit.days} setLoading={setLoading}/>))}
		</StyledDiv>
	);
}