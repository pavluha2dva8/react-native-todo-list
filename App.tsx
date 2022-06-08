import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Task from "./components/Task";
import {useState} from "react";

export default function App() {
  const [task, setTask] = useState('')
  const [taskItems, setTaskItems] = useState<string[]>(['Do something!'])

  const handleAddTask = () => {
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask('')
  }

  const completeTask = (index: number) => {
    let copy = [...taskItems]
    copy.splice(index, 1)
    setTaskItems(copy)
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {taskItems.map((taskItem, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => completeTask(i)}>
                <Task text={taskItem}/>
              </TouchableOpacity>
            )
          })}
        </View>

      </View>

      <KeyboardAvoidingView
        style={styles.writeTaskWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
  },
  input: {
    width: 250,
    padding: 15,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#C0C0C0',
    backgroundColor: '#FFF',
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addText: {},
});
