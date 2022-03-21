import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "@/plugins/firebase";

export const getCursos = async () => {
    const querySnapshot = await getDocs(collection(db, "cursos"));
    const lista_cursos = [];
    querySnapshot.forEach((doc) => {
        const obj = doc.data();
        lista_cursos.push({
            id: doc.id,
            ...obj
        });
    });
    return lista_cursos;
}

export const deleteCurso = async (id) => {
    await deleteDoc(doc(db, "cursos", id));
}

export const addCurso = async (cursoObject) => {
    try {
        const docRef = await addDoc(collection(db, "cursos"), cursoObject);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}