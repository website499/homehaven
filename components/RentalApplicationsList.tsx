import type { RentalApplication } from "@/types"

interface RentalApplicationsListProps {
  applications: RentalApplication[]
}

export default function RentalApplicationsList({ applications }: RentalApplicationsListProps) {
  return (
    <div>
      <h5 className="font-semibold mt-4 mb-2">Rental Applications</h5>
      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul className="space-y-2">
          {applications.map((application) => (
            <li key={application.id} className="bg-gray-100 p-2 rounded">
              <p>
                <strong>Name:</strong> {application.name}
              </p>
              <p>
                <strong>Email:</strong> {application.email}
              </p>
              <p>
                <strong>Phone:</strong> {application.phone}
              </p>
              <p>
                <strong>Income:</strong> ${application.income}
              </p>
              <p>
                <strong>Message:</strong> {application.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

