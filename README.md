# Kirenga Cargo

Premium cargo, courier and logistics platform.

## Platform
- React + TypeScript + Vite
- Firebase Authentication
- Cloud Firestore
- Role-based workspaces: administrator, operations, driver, customer
- Public shipment tracking
- Customer shipment requests
- Shipment status workflow
- Firestore security rules
- Audit log foundation

## Firebase setup
1. Create a Firebase project.
2. Enable **Authentication → Email/Password**.
3. Create a Firestore database.
4. Copy `.env.example` to `.env.local` and fill in the Firebase web-app values.
5. Deploy Firestore rules and indexes with the Firebase CLI.
6. Install dependencies and run `npm run dev`.
7. Build for production with `npm run build`.

## Roles
New registrations are created as **customer** by design. Administrator, operations and driver roles must be granted from a trusted administrative process; the client cannot elevate its own role.

## Security
Do not commit `.env.local`, Firebase service-account keys, passwords or private API keys. Public tracking intentionally exposes only tracking status data, not customer profile or cargo-private fields.

## Core collections
`users`, `bookings`, `shipments`, `tracking`, `auditLogs`.

## Controlled booking lifecycle
Bookings begin as **PENDING REVIEW**. Authorized administration can confirm a booking, which creates a shipment with separate booking, tracking and receipt identifiers and a randomly generated customer access code. The access code is stored as a SHA-256 hash and verified by Firebase Functions.

After verification, the customer reviews the official shipment details and can confirm them. Customer confirmation is enforced server-side as **CUSTOMER_CONFIRMED_LOCKED**. Customer correction requests are submitted through a server-side function and do not directly modify the shipment.

### Firebase Functions deployment
From the repository root, install dependencies in `functions/` and deploy the backend with:

```bash
cd functions
npm install
cd ..
firebase deploy --only functions,firestore,hosting
```

The secure tracking workplace uses the callable functions `verifyTrackingAccess`, `confirmTrackingShipment`, and `requestTrackingCorrection`.
