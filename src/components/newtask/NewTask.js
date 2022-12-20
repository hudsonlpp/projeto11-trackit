import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authentication";
import { StyledButton, TextInput } from "../../styles/GlobalStyles";
import { NewTaskDiv, DayButton } from "./styled"
import Loading from "../../pages/loading/Loading";

export default function NewTask({expand, setExpand, selected, setSelected, habitName, setHabitName,}) {
	const [loading, setLoading] = useState(false);
	const {config} = useContext(AuthContext);

    const days = "DSTQQSS".split("");

	function handleSelection(index) {
		if (selected.includes(index)) {
			setSelected(selected.filter((item) => item !== index));
		} else {
			setSelected([...selected, index]);
		}
	}

	function handleSubmit(){
		const body = {
			name: habitName,
			days: selected
		}
		setLoading(true);
		axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
		.then(()=>{
			setExpand(0);
			setSelected([]);
			setHabitName("");
			setLoading(false);
		})
		.catch(()=>{
			alert("Erro em cadastrar hábito, tente novamente.");
			setLoading(false);
		})
	}

	return (
		<NewTaskDiv data-test="habit-create-container" expand={expand}>
			<div>
				<TextInput
					data-test="habit-name-input"
					type="text"
					onChange={(e) => {
						setHabitName(e.target.value);
					}}
					value={habitName}
					placeholder="nome do hábito"
					disabled={loading}
				/>
				<div>
					{days.map((day, index) => (
						<DayButton
							data-test="habit-day"
							key={index}
							selected={selected.includes(index) ? 1 : 0}
							onClick={() => {
								handleSelection(index);
							}}
						>
							{day}
						</DayButton>
					))}
				</div>
			</div>
			<div>
				<button
					data-test="habit-create-cancel-btn"
					onClick={() => {
						setExpand(0);
					}}
					disabled={loading}
				>
					Cancelar
				</button>
				<StyledButton data-test="habit-create-save-btn" onClick={handleSubmit} width="84px" height="35px" fontSize="16px" disabled={loading}>
					{loading ? <Loading /> : "Salvar"}
				</StyledButton>
			</div>
		</NewTaskDiv>
	);
}