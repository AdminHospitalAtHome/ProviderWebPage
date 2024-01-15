import {View} from 'react-native'
import ChatFrame from '../components/ChatFrame'
import ChatSideBar from "../components/ChatSideBar";

export default function ChatPage(providerId: number):JSX.Element{
	return (<View>
		<ChatSideBar providerId = {providerId}></ChatSideBar>
		<ChatFrame></ChatFrame>
	</View>);
}
