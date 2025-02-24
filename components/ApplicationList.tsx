import type { RentalApplication } from "@/types"

interface ApplicationListProps {
  applications: RentalApplication[]
}

export default function ApplicationList({ applications }: ApplicationListProps) {
  return (
    <div>
      <h5 className="font-semibold mt-4 mb-2">Applications</h5>
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
                <strong>Status:</strong> {application.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

