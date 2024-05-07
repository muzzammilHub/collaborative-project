import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios'

const sendFormDataToBackend = async(formData, email)=>{
    try {

        const isAppended = formData.has('pdf')

        console.log("**********",isAppended)

        if(isAppended){

            // const {data} = await axios.get()

        const {data} = await axios.post(`http://127.0.0.1:4000/api/v1/doctor/pdf-send?email=${email}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('doctorToken')}`
                
            }
        })
        console.log(data)
        }

    } catch (error) {
        console.log("Error: ", error)
    }
    
}

const generatePdfFromContent = (contentElement, pdfFileName, email)=> async(dispatch) => {
  const pdf = new jsPDF('p', 'pt', 'a4')

  const content = contentElement

  html2canvas(content, { scale: 2 }).then((canvas) => {
    const formData = new FormData()
    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', 40, 40, 500, 400) // Adjust position and dimensions as needed

    // Convert the PDF to a blob
    const pdfBlob = pdf.output('blob')

    // Create a FormData object to send the PDF to the backend
    formData.append('pdf', pdfBlob, pdfFileName)
    
    sendFormDataToBackend(formData, email)

  })
}

export default generatePdfFromContent;