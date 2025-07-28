const styles: { [key: string]: CSSProperties } = {
	cardWrapper: {
		width: "100%",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000",
	},
	card: {
		width: "500px",
		height: "300px",
		position: "relative",
		backgroundColor: "#fff",
		borderRadius: "8px",
		overflow: "hidden",
		boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
		display: "flex",
		flexDirection: "column",
	},
	image: {
		width: "100%",
		height: "140px",
		objectFit: "cover",
	},
	content: {
		padding: "16px",
		flex: 1,
	},
	title: {
		fontSize: "20px",
		fontWeight: "bold",
		marginBottom: "8px",
	},
	description: {
		fontSize: "14px",
		color: "#555",
	},
	ctaContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "50px",
		height: "40px",
		backgroundColor: "yellow",
		borderTopRightRadius: "10px",
		transition: "width 0.3s ease-in-out",
		cursor: "pointer",
		overflow: "hidden",
	},
	ctaHover: {
		width: "120px",
	},
	ctaContent: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "bold",
	},
	pseudoAfter: {
		content: '""',
		width: "10px",
		height: "10px",
		background: "radial-gradient(circle at top right, transparent 70%, yellow 0%)",
		position: "absolute",
		top: 0,
		left: 0,
		transform: "translateY(-100%)",
	},
	pseudoBefore: {
		content: '""',
		width: "20px",
		height: "20px",
		background: "radial-gradient(circle at top right, transparent 70%, yellow 0%)",
		position: "absolute",
		right: 0,
		bottom: 0,
		transform: "translateX(100%)",
	},
};


type CardData = {
  image: string;
  title: string;
  description: string;
};

const cards: CardData[] = [
  {
    image: '/group/dates.png',
    title: 'شركة أمل الخير للتمور',
    description: 'من أوائل المشاريع المعتمدة لمنطقة الباحة بالمملكة، باستخدام أجود السلالات، وقد تم تصدير المنتج للعديد من الدول. 100% ذاوية.',
  },
  {
    image: '/group/fish.png',
    title: 'شركة أمل الخير للأسماك',
    description: 'من أوائل المشاريع المعتمدة لمنطقة الباحة بالمملكة، باستخدام أجود السلالات، وقد تم تصدير المنتج للعديد من الدول. 100% ذاوية.',
  },
  {
    image: '/group/alaf.png',
    title: 'شركة أمل الخير للأعلاف',
    description: 'من أوائل المشاريع المعتمدة لمنطقة الباحة بالمملكة، باستخدام أجود السلالات، وقد تم تصدير المنتج للعديد من الدول. 100% ذاوية.',
  },
  {
    image: '/group/eggs.png',
    title: 'شركة أمل الخير للدواجن',
    description: 'من أوائل المشاريع المعتمدة لمنطقة الباحة بالمملكة، باستخدام أجود السلالات، وقد تم تصدير المنتج للعديد من الدول. 100% ذاوية.',
  },
];

const GroupSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 rtl text-right">
      <h2 className="text-2xl font-semibold text-center mb-12">
        مجموعة <strong>أمل الخير</strong> القابضة
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative w-64 rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <img src={card.image} alt={card.title} className="w-16 h-16 mb-4 object-contain" />
            <h3 className="text-lg font-bold mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.description}</p>

            {/* Show Corner */}
            <div className="cta-container absolute bottom-0 left-0">
              <div className="content w-full h-full flex items-center justify-center font-bold text-sm">
                المزيد
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GroupSection;
