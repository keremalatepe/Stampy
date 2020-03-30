import React, {useState, useEffect} from 'react'
import {Text, View, Button} from 'react-native'
const Hello = ({name}) =>  <Text>Hello {name}!</Text>

export default Hello

export const CounterFunctional = ({initial_value, step}) => {
    [count, setCount] = useState(initial_value)
    useEffect(() => { //runs on every render
        console.warn("çalıştı")
        return () => {console.warn("unmount")}
    }, []) //will run when count is updated
    return(
        <View> 
            <Text>Count {count}</Text>
            <Button title="Increment" onPress={() => setCount(count + step)}></Button>    
            <Button title="Reset" onPress={() => setCount(initial_value)}></Button>    
         </View>
    )
}

export class Counter extends React.Component{
    state = {count:5}

    componentDidMount(){ 
        this.setState({count: this.props.initial_value})
    }


    render(){
        const {count} = this.state
        const {step, initial_value} = this.props
        return(
            <View> 
                <Text>Count {count}</Text>
                <Button title="Increment" onPress={() => this.setState({count: count + step})}></Button>    
                <Button title="Reset" onPress={() => this.setState({count: initial_value})}></Button>    
             </View>
        )
    }
}

