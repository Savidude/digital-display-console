var tableBasic = $('#images').DataTable({
                responsive: true,
                ajax: "../data/images.json",
                columns: [
                    { "data": "name" },
                    { "data": "uploaded" },
                    { "data": "preview" },
                    { "data": "action" }
                ]
            });

