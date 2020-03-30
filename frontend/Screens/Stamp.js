import React,{useCallback, useState, useEffect} from 'react';
import {StyleSheet, Image,View, ActivityIndicator } from 'react-native';
import {Text, ListItem, Icon, Button } from '@ui-kitten/components';
import Card from '../Components/Card'
import {useParams} from 'react-router-native'
import QRCode from 'react-native-qrcode-svg';
import useCustomAxios from '../Hooks/useCustomAxios'

const Stamp = () => {
    const {cardId} = useParams()
    const [QRText, setQRText] = useState(null)
    const [{ loading, error}, execute] = useCustomAxios(
        {
          url: '/get-qr',
          method: 'POST'
        },
        { manual: true }
      )
    useEffect(() => {
        const func = async () => {
            try{
                const {data} = await execute({data:{business_id: cardId}})
                setQRText(data.data.qr_code)
            }
            catch(e){
                console.warn(e)
            }
        }
        func()
    }, [setQRText, execute])
    return(
        <View style={styles.container}>
            <View style={{flex:5, alignItems:'center', justifyContent:'center'}}>
                {loading ? <ActivityIndicator/> : (QRText && <QRCode
                    
                    value={QRText}
                    size={200}/>)}
            </View>

            <Text style={{flex:3, fontSize:18}}appearance='hint'>Please show the QR code to cashier.</Text>
        </View>     
    )
}


export default Stamp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});