import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getTargetInfo } from '../../../slices/targetSlice';
import Savings from './Savings';
import { AddTarget } from '../../../components/AddTarget';

function SavingsRender() {

    const dispatch = useAppDispatch()
    const { targets } = useAppSelector((state) => state.targets)
   

    useEffect(() => {
        dispatch(getTargetInfo())

    }, [dispatch])
    return (
        <>
            {targets.length < 1 ? <Savings /> : <AddTarget />}
        </>

        // <div>SavingsRender</div>
    )
}

export default SavingsRender