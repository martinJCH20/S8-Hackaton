import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import {Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker'

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backGroundImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    title: {
        fontSize: 25
    },
    containerTitle: {
        marginLeft: '5%'
    },
    titleOptions: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: '2%'
    },
    containerOptions: {
        marginLeft: '5%',
        marginTop: '5%',
        width: '90%'
    }
})

let f = new Date();


export default class Hackaton1 extends Component{
    constructor(props){
        super(props);
        //let fComplete = f.getFullYear().toString()+'-'+(zfill(f.getMonth()+1,2)).toString()+'-'+zfill(f.getDay(),2).toString()
        this.state = {
            actualMonth: f.getMonth() + 1,
            year: f.getFullYear().toString(),
            month: (zfill(f.getMonth()+1,2)).toString(),
            day: zfill(f.getDate(),2).toString(),
            setDate: ''
          //  actualDate: fComplete
        }
    }
    
    checkMonth = (month) => {
        //console.warn(month);
        this.setState({
           month: month
        })
    }
    changeDay = (day) => {
        this.setState({
            setDate: day.year+'-'+zfill(day.month,2)+'-'+zfill(day.day,2)
        })
    }
    render(){
        const { actualMonth, year, month, day, setDate } = this.state;
        //console.warn(setDate);    
        return(
            <View style={styles.container}>
                <ImageBackground source={require('./assets/fondo.jpg')}  style={styles.backGroundImage}>
                    <View style={styles.containerTitle}><Text style={styles.title}>Appointment</Text></View>
                    <View style={styles.containerOptions}>
                        <Text style={styles.titleOptions}>PICK DATE</Text>
                        
                        <RNPickerSelect
                            //onValueChange={(value) => console.log(value)}   
                            onValueChange={(value) => this.checkMonth(value)}   
                            itemKey={actualMonth.toString()}                  
                            items={[
                                { label: 'Enero', value: '01', key: '1' }, { label: 'Febreo', value: '02', key: '2' },
                                { label: 'Marzo', value: '03', key: '3' }, { label: 'Abril', value: '04', key: '4' }, 
                                { label: 'Mayo', value: '05', key: '5' }, { label: 'Junio', value: '06', key: '6' },
                                { label: 'Julio', value: '07', key: '7' }, { label: 'Agosto', value: '08', key: '8' },
                                { label: 'Septiembre', value: '09', key: '9' }, { label: 'Octubre', value: '10', key: '10' },
                                { label: 'Noviembre', value: '11', key: '11' }, { label: 'Diciembre', value: '12', key: '12' }
                            ]}
                        />
                        <Calendar 
                         current={year+'-'+month+'-'+day}                         
                          markedDates={{
                             [setDate]: { selected: true, selectedColor: '#87CEFA'}
                           }}
                           
                          hideArrows={true}
                          hideExtraDays={true}
                          hideDayNames={true}
                          horizontal={true}
                          pagingEnabled={true}
                          onDayPress={(day) => {this.changeDay(day)}}                         
                          onMonthChange={(month) => {console.warn('month changed', month['year'])}}
                          firstDay={1}

                          disableArrowLeft={true}
                          disableArrowRight={true}
                        />
                        
                    </View>
                    <View style={styles.containerOptions}>
                        <Text style={styles.titleOptions}>PICK TIME</Text>
                        <View style={{alignItems: 'center'}}>
                        <DatePicker 
                         mode='time'
                        />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}