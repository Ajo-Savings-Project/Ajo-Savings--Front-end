import ProgressBar from '../../components/ProgressBar';
import { useState } from 'react';
// import { Input } from "../../components/Input";
const Home = () => {
	const [percentage, setPercentage] = useState<number>(0);

	// Simulate progress changes (e.g., fetch data or some task)
	setTimeout(() => {
		setPercentage(50); // Change this value as needed
	}, 1000);
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Progress Bar Example</h1>
			
			
			<ProgressBar  text= "Travel" percentage={percentage}>
				<div>
					<h1>let play</h1>
				</div>
			</ProgressBar>
		</div>
	)
};

export default Home;

you can now adjust it according to the name of your page ie if you want to use it in about page it will be const About not Home 
