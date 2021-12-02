import { useState } from "react"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader"
import Main from "../components/Main"

const Presale = () => {

  const [email, setEmail] = useState("")
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState("")

  const registerMail = async (e) => {
    setSaving(true)
    e.preventDefault()
    try {
      const res = await fetch(`/api/presale`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
      })
      setSaving(false)
      setSuccess(true)
      return res
    } catch (error) {
      return error
    }
  }

  return (
    <Main title='Presale' titleSuffix={true}>
      <section className="text-center text-xl">
        <h1 className="text-white">Presale</h1>
        <p className="mt-8 mb-2">
          Are you excited for the drop?<br />
          We definitely are – and this is your chance!</p>
        <p className="mb-6">
          You have been chosen.<br />
          Please enter your email to get privileged notifications <i>before</i> DeezNutz drop!
        </p>
        <form onSubmit={registerMail} className="flex flex-col gap-6 items-center pb-16 w-full">
          <input type="email" onChange={(e) => setEmail(e.target.value)} disabled={success || saving} className="px-4 py-3 w-full md:w-2/3 max-w-md border-2 border-brand text-center text-xl text-brand rounded-lg" required></input>

          {success ?
            <p>Thank you!<br />We will notify you soon :)</p>
            :
            !saving ?
              <button type="submit" className="button">Notify me!</button>
              :
              <ClimbingBoxLoader color={"var(--color-brand)"} size={15} />
          }
        </form>
      </section>
    </Main>
  )
}

export default Presale
