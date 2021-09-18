import React, { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen.png';
import XIcon from '../assets/icons/X.png';

import { Task } from "./TasksList";;


interface TaskItemProps {
    index: number;
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTaskName: string) => void;
}

export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setNewTaskTitle(task.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, newTaskTitle);
        setIsEditing(false);
    }

    useEffect(() => {
        if (isEditing) textInputRef.current?.focus();
        else textInputRef.current?.blur();
    }, [isEditing])

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${index}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        value={newTaskTitle}
                        onChangeText={setNewTaskTitle}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.iconsContainer}>
                {
                    isEditing ?
                        <TouchableOpacity
                            onPress={handleCancelEditing}
                        >
                            <Image source={XIcon} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={handleStartEditing}
                        >
                            <Image source={penIcon} />
                        </TouchableOpacity>
                }
                <View style={styles.divider}></View>
                <TouchableOpacity
                    testID={`trash-${index}`}
                    onPress={() => removeTask(task.id)}
                >
                    <Image
                        source={trashIcon}
                        style={{ opacity: isEditing ? 0.2 : 1 }}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 20,
        alignItems: 'center'
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: "rgba(196, 196, 196, 0.24)",
        marginHorizontal: 12
    }
})