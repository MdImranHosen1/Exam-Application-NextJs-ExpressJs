'use client'
import React, { useEffect, useState } from 'react'
import BASE_URLS from '../../../../urlsConfig';

const ExamViva = () => {

    const [questionsList, setQuestionsList] = useState('')



    const getQuestionsList = async () => {
        try {
            const response = await axios.get(BASE_URLS.backend + '/exam/viva');
            setQuestionsList(response.data)
        } catch (error) {
            console.error('Error:', error);
        }

        console.log(questionsList);
    }

    useEffect(() => {
        getQuestionsList();
    }, [])

    return (
        <div className='w-screen h-screen '>
            <div className="">Questions</div>
            <div>
                <div>Code note</div>
                <div>
                    <div>

                    </div>
                    <div>
                        Questions number 1
                    </div>
                    <div>
                        Time: 70s
                    </div>
                    <div>
                        <div>Skip</div>
                        <div>Next</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ExamViva